const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("My Token test", () => {

    let tokenURI = "https://mytokenuri.com";
    let tokenName = "MyToken";
    let tokenSymbol = "MTK";

    async function NftFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const MyERC721Token = await ethers.getContractFactory("MyToken");
        const myToken = await MyERC721Token.deploy();

        await myToken.waitForDeployment();

        return { myToken, owner, addr1, addr2 }
    }

    describe("Mint NFTs", () => {
        it("Should set the right name and symbol", async () => {
            const {myToken, owner, addr1, addr2} = await loadFixture(NftFixture);

            expect(await myToken.name()).to.equal(tokenName);
            expect(await myToken.symbol()).to.equal(tokenSymbol);

        });

        it("should mint tokens to owner", async () => { 
            const {myToken, owner, addr1, addr2} = await loadFixture(NftFixture);

            expect(await myToken.balanceOf(owner.address)).to.equal(0);
            await myToken.safeMint(owner.address, tokenURI);

            expect(await myToken.balanceOf(owner.address)).to.equal(1);
            expect(await myToken.ownerOf(1)).to.equal(owner.address);
            expect(await myToken.tokenURI(1)).to.equal(tokenURI);
        });

        it("should fail if the minter is not the owner", async () => {
            const {myToken, owner, addr1, addr2} = await loadFixture(NftFixture);

            await expect(myToken.connect(addr1).safeMint(addr1.address, tokenURI))
                .to.be.revertedWith(
                "Ownable: caller is not the owner"
            );

            expect(await myToken.balanceOf(addr1.address)).to.equal(0);
        });
    });

});