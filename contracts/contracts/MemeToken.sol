// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MemeToken is ERC20{

    uint256 constant TOKENSUPPLY = 1e27;
    constructor(string memory name, string memory ticker, address _bondingCurve) ERC20(name,ticker){
        _mint(_bondingCurve, TOKENSUPPLY);
    }
}