
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract AddressWhitelister{

    address public admin;
    address public tokenFactory;

    mapping (bytes32=>address[]) public campaigns;
    mapping (address=>bytes32) public campaign_token;

    error NotAdmin();
    error NotTokenFactory();

    constructor(){
        admin = msg.sender;
    }

    function setTokenFactory(address _factory) external {
        if(msg.sender!=admin) revert NotAdmin();
        tokenFactory = _factory;
    }

    function whitelistCampaign(bytes32 _campaignid, address _campaign_token) external {
        if(msg.sender!=tokenFactory) revert NotTokenFactory();
        campaign_token[_campaign_token] = _campaignid;
    }
 
    function whitelistAddress(bytes32 _idcampaign,address _toWhitelist) external {
        if(msg.sender!=admin) revert NotAdmin();
        campaigns[_idcampaign].push(_toWhitelist);
    }

    function isWhitelisted(bytes32 _idcampaign,address _toCheck) public view returns(bool){
        for (uint i = 0; i < campaigns[_idcampaign].length; i++) {
            if (campaigns[_idcampaign][i] == _toCheck) {
                return true;
            }
        }
        return false;
    }

}