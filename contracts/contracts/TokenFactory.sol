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
        string bannerUrl;
        string posterUrl;
    }     
    BondingCurve public BondingCurveAddress;
    AddressWhitelister public whitelister;
    mapping(address=>address) public tokenCreator;
    address public constant USDC=0xD93650A627df8b4b6756853531f7bf8e0ecA6d22;
    uint256 constant BUYLIMIT = 11e7;

    error LimitAmountExceeded();
    error NotWhitelisted();
    error CampaignAlreadyExists();
    event CampaignCreated(CampaignParams _campaign, address _token);

    constructor(BondingCurve _bondingCurve,AddressWhitelister _whitelister){
        BondingCurveAddress = _bondingCurve;
        whitelister = _whitelister;
    }

    modifier limitedAmount(uint256 _buyAmount){
        if (_buyAmount>BUYLIMIT) revert LimitAmountExceeded();
        _;
    }

    function deployToken(CampaignParams memory _campaign,address _tokenToPay, uint256 initialBuy) external limitedAmount(initialBuy){
        MemeToken token = new MemeToken(_campaign.tokenName,_campaign.tokenTicker, address(BondingCurveAddress));
        bytes32 campaign_id = keccak256(abi.encode(_campaign.tokenName,_campaign.tokenTicker, _campaign.description));
        if (whitelister.campaignExists(campaign_id)) revert CampaignAlreadyExists();
        whitelister.whitelistCampaign(campaign_id, address(token));
        uint256 tokenToSend = BondingCurveAddress.getTokenAmount(address(token), initialBuy);
        MemeToken(_tokenToPay).transferFrom(msg.sender,address(BondingCurveAddress), initialBuy);
        BondingCurveAddress.sendToken(address(token), msg.sender, tokenToSend);
        tokenCreator[address(token)] = msg.sender;
        emit CampaignCreated(_campaign, address(token));
    }

    function buyToken(address token,address _tokenToPay,uint256 _amount) external limitedAmount(_amount) {
        bytes32 campaign = whitelister.campaign_token(token);
        if(!whitelister.isWhitelisted(campaign, msg.sender)) revert NotWhitelisted();
        uint256 tokenAmount = MemeToken(token).balanceOf(msg.sender);
        uint256 balanceBuy = BondingCurveAddress.getTokenValue(token, tokenAmount);
        if(balanceBuy>BUYLIMIT) revert LimitAmountExceeded();
        uint256 tokenToSend = BondingCurveAddress.getTokenAmount(token, _amount);
        MemeToken(_tokenToPay).transferFrom(msg.sender,address(BondingCurveAddress), _amount);
        BondingCurveAddress.sendToken(token, msg.sender, tokenToSend);
    }

    function sellToken(address token,uint256 _amount) external{

    }
}