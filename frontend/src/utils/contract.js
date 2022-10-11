export const legacyAddress = "0xe402FbE6997D89590272C63b14515320E951008A"

export const legacyAbi = [
    "function legacies(uint256) view returns (address, address, uint256, uint256, bool)",
    "function legacyIndexes(address owner) view returns(uint256)",
    "function create(address _legatee, uint256 _checkInterval)",
    "function addTokens(address[] memory _tokens)",
    "function checkIn()",
    "function getLegacyTokens(uint256 _index) view returns(address[] memory)",
    "function updateLegacy(address _legatee, uint256 _checkInterval)"
]