pragma solidity ^0.4.19;

contract KingOfTheEther {
  address public owner;
  address public kingAddress;
  uint256 public amount;
  uint256 public minBet;

  function KingOfTheEther() public {
    owner = msg.sender;
    kingAddress = msg.sender;
    amount = 0;
    minBet = 10 finney;
  }

  function adjustMinBet(uint256 newMinBet) public {
    if (msg.sender == owner) {
      minBet = newMinBet;
    }
  }

  function becomeKing() public payable returns (bool) {
    if (msg.sender == kingAddress) {
      return false;
    }

    if (msg.value >= amount + minBet) {
      amount = msg.value;

      if (!kingAddress.send(msg.value)) {
        owner.transfer(msg.value);
      }

      kingAddress = msg.sender;

      return true;
    }

    return false;
  }

  function getState() public returns (address, uint256, uint256) {
    return (kingAddress, amount, minBet);
  }

  function finishGame() public {
    if (msg.sender == owner) {
      selfdestruct(owner);
    }
  }
}

