// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {INttToken} from "./INttToken.sol";

contract TestUSDC is ERC20,INttToken{

    constructor() ERC20("USDC stable coin","USDC"){
    }

    function burn(uint256 amount) external override {
        _burn(msg.sender, amount);
    }

    function mint(address account, uint256 amount) external override {
        _mint(account, amount);
    }

    function setMinter(address newMinter) external override {
        // pass
    }

}