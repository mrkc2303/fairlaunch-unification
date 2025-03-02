// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {TokenFactory} from "./TokenFactory.sol";


contract EscrowSepolia{

    address public bot;
    address public tokenFactory;
    address public tokenManager;
    address public escrowBase;

    error NotAdmin();
    constructor(){
        bot = msg.sender;
    }

    modifier onlyBot(){
        if(msg.sender!=bot) revert NotAdmin();
        _;
    }

    function release_funds(address sender,TokenFactory.CampaignParams memory _campaign,address _tokenToPay, uint256 initialBuy) external onlyBot{
        ERC20 token = TokenFactory(tokenFactory).deployToken(_campaign, _tokenToPay, initialBuy);
        uint256 amountToSend = token.balanceOf(address(this));
        token.transfer(sender, amountToSend);
    }

}