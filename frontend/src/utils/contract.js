export const legacyAddress = "0x144e042bA6eA286F022696BE8a3749eC7dC402a0"

export const legacyAbi = [
    "function legacies(uint256) view returns (address, address, uint256, uint256, bool)",
    "function legacyIndexes(address owner) view returns(uint256)",
    "function create(address _legatee, uint256 _checkInterval)",
    "function addTokens(address[] memory _tokens)",
    "function checkIn()"
]