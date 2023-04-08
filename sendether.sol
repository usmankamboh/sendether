// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
contract EtherTransfer {
    struct amount{
        address _recipient;
        uint256 _amount;
    }
    mapping (address =>amount) valuesend;
    function transferEther(address payable _recipient,uint256 _amount) public payable {
        _recipient.transfer(_amount);
        valuesend[msg.sender] = amount(_recipient,_amount);
    }
    function getbalance(address user) public view returns(uint256){
        return user.balance;
    }
    function ledger(address user) public view returns(address,uint256){
        return (
            valuesend[user]._recipient,
            valuesend[user]._amount
        );
    }
}
