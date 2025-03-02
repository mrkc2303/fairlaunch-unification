// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestUSDC is ERC20{

    uint256 constant TOKENSUPPLY = 1e27;
    constructor() ERC20("USDC stable coin","USDC"){
        _mint(msg.sender, TOKENSUPPLY);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}