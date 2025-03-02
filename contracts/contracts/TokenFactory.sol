// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {MemeToken} from "./MemeToken.sol";
import {AddressWhitelister} from "./AddressWhitelister.sol";
import {BondingCurve} from "./BondingCurve.sol";

contract TokenFactory {

    struct CampaignParams{
        string tokenName;
        string tokenTicker;
        string description;
        string image;
    }     
    BondingCurve public BondingCurveAddress;
    AddressWhitelister public whitelister;
    mapping(address=>address) public tokenCreator;
    address public constant USDC=0x9Fb12C42Fd17062EC67D29ac7C35Ad3957D1620b;
    uint256 constant BUYLIMIT = 11e7;

    error LimitAmountExceeded();
    error NotWhitelisted();
    event CampaignCreated(CampaignParams _campaign, address _token);

    constructor(BondingCurve _bondingCurve,AddressWhitelister _whitelister){
        BondingCurveAddress = _bondingCurve;
        whitelister = _whitelister;
    }

    modifier limitedAmount(uint256 _buyAmount){
        if (_buyAmount>BUYLIMIT) revert LimitAmountExceeded();
        _;
    }

    function deployToken(CampaignParams memory _campaign, uint256 initialBuy) external limitedAmount(initialBuy){
        MemeToken token = new MemeToken(_campaign.tokenName,_campaign.tokenTicker, address(BondingCurveAddress));
        uint256 tokenToSend = BondingCurveAddress.getTokenAmount(address(token), initialBuy);
        BondingCurveAddress.sendToken(address(token), msg.sender, tokenToSend);
        tokenCreator[address(token)] = msg.sender;
        emit CampaignCreated(_campaign, address(token));
    }

    function buyToken(address token,uint256 _amount) external limitedAmount(_amount) {
        bytes32 campaign = whitelister.campaign_token(token);
        if(!whitelister.isWhitelisted(campaign, msg.sender)) revert NotWhitelisted();
        uint256 tokenAmount = MemeToken(token).balanceOf(msg.sender);
        uint256 balanceBuy = BondingCurveAddress.getTokenValue(token, tokenAmount);
        if(balanceBuy>BUYLIMIT) revert LimitAmountExceeded();
        uint256 tokenToSend = BondingCurveAddress.getTokenAmount(token, _amount);
        BondingCurveAddress.sendToken(token, msg.sender, tokenToSend);
    }

    function sellToken(address token,uint256 _amount) external{

    }
}