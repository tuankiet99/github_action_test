// import { ethers } from 'hardhat'

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000)
//   const unlockTime = currentTimestampInSeconds + 60

//   const lockedAmount = ethers.parseEther('0.001')

//   const lock = await ethers.deployContract('Lock', [unlockTime], {
//     value: lockedAmount,
//   })

//   await lock.waitForDeployment()

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount,
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`,
//   )
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error)
//   process.exitCode = 1
// })

import { ethers } from 'hardhat'
import { Leaf, Tree } from '../dist'

async function main() {
  // Tree
  const [deployer] = await ethers.getSigners()
  const leaves: Leaf[] = Array.from(Array(4).keys()).map(
    (i) =>
      new Leaf(deployer.address, BigInt(i + 1) * 1_000_000_000_000_000_000n),
  )
  const tree = new Tree(leaves)
  // Deploy MerkleDistribution
  const distributor = await ethers.deployContract('MerkleDistribution', [
    '0x078E68C643a8FF417b19eaa75E252592725C6fE0', // ERC20 Token on Sepolia
    tree.root.value,
  ])
  await distributor.waitForDeployment()
  console.log('Distributor Address:', distributor.target)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
