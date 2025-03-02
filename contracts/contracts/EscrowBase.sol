// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EscrowBase{
    struct CampaignParams{
        string tokenName;
        string tokenTicker;
        string description;
        string bannerUrl;
        string posterUrl;
    }  
    address public admin;
    address public tokenManager;
    address public token;
    address public escrowSepolia;

    error NotAdmin();
    error CallFailed();
    event TokenReceived(address sender,CampaignParams params, uint256 amount);
    constructor(address _tokenManager, address _token){
        tokenManager = _tokenManager;
        token = _token;
        admin = msg.sender;
    }

    modifier onlyAdmin(){
        if(msg.sender!=admin) revert NotAdmin();
        _;
    }

    function setEscrowSepolia(address _sepoliaEscrow) external onlyAdmin{
        escrowSepolia = _sepoliaEscrow;
    }

    function createToken(CampaignParams memory _campaign, uint256 initialBuy) external {
        ERC20(token).transferFrom(msg.sender, address(this), initialBuy);
        _sendNTT(initialBuy);
        emit TokenReceived(msg.sender,_campaign,initialBuy);
    }

    function _sendNTT(uint256 amount) internal returns(bool){
        (bool success,bytes memory returndata) = tokenManager.call{value:0}(abi.encodeWithSignature("transfer(amount,uint16,bytes32)", amount,1002,abi.encodePacked(escrowSepolia)));
        if(!success){
            if (returndata.length == 0) revert CallFailed();
            assembly {
                revert(add(32, returndata), mload(returndata))
            }
        }
        return true;
    }

}