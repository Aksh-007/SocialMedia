import crypto from "crypto"

const hashedToken = (inputString) => {
    try {
        console.log(inputString)
        const hashedToken = crypto
            .createHash("sha256")
            .update(inputString)
            .digest("hex")

        // setting the date 
        // this.emailVerificationExpiry = Date.now() + 60 * 60 * 1000
        return hashedToken;

    } catch (err) {
        console.log(err);
        throw new Error("Error in generate Verfification token ")
    }
}
export default hashedToken