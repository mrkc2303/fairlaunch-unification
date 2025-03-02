// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


library Math {
    function cubeRoot(uint256 n) internal pure returns (uint256) {
        if (n == 0) return 0;

        uint256 x = n;
        uint256 y = (2 * x + n / (x * x)) / 3;

        while (y < x) {
            x = y;
            y = (2 * x + n / (x * x)) / 3;
        }

        return x;
    }
}

contract BondingCurve{

    address public admin;
    address public tokenFactory;
    error NotAdmin();
    error NotTokenFactory();
    error IncorrectToken();

    uint256 constant K= 1e16;
    uint256 constant BASEPOINT = 1e18;
    constructor(){
        admin = msg.sender;
    }

    function setTokenFactory(address _factory) external {
        if(msg.sender!=admin) revert NotAdmin();
        tokenFactory = _factory;
    }

    function sendToken(address _token, address _receiver, uint256 _value) external {
        if(msg.sender!=tokenFactory) revert NotTokenFactory();
        if(ERC20(_token).balanceOf(address(this)) <=_value) revert IncorrectToken();
        ERC20(_token).transfer(_receiver, _value);
    }

    function getTokenAmount(address _token,uint256 _USDCValue) public view returns(uint256){
        uint256 tokenSold = (ERC20(_token).totalSupply() - ERC20(_token).balanceOf(address(this)))/BASEPOINT;
        return (Math.cubeRoot(3*K*_USDCValue + tokenSold**3) - tokenSold)*BASEPOINT;        
    }

    function getTokenValue(address _token,uint256 _tokenAmount) public view returns(uint256){
        uint256 tokenSold = (ERC20(_token).totalSupply() - ERC20(_token).balanceOf(address(this)))/BASEPOINT;
        return ((tokenSold+_tokenAmount)**3 - tokenSold**3)/(3*K);
    }
    


}
