import userSchema from "../models/user.schema.js"
import friendRequestSchema from "../models/friendsRequest.schema.js"
import asyncHandler from "../utility/asyncHandler.js"
import randomStringGenerator from "../utility/randomStringGenerator.js"

/******************************************************
 * @GET_VERIFYEMAIL
 * @route http://localhost:5000/api/v1/user/verifyEmail/:userId/:token
 * @description Verify the userId
 * @parameters userId , token  
 * @returns Verified User
 ******************************************************/
export const verifyEmail = asyncHandler(async (req, res) => {
    const { token, userId } = req.params

    const userExists = await userSchema.findById(userId)

    if (!userExists) throw new Error('No such User Exist please register', 404)

    const isVerifyTokenMatch = await userExists.compareVerifyToken(token)

    if (!isVerifyTokenMatch) throw new Error('Invalid Verification Token', 401)

    // if token match change isVerified:true ad save
    userExists.isVerified = true;

    // set it to empty 
    userExists.emailVerificationToken = undefined
    await userExists.save();

    res.status(200).json({
        success: true,
        message: 'Email Verified Succesfully',
        user: userExists
    })


})




/******************************************************
 * @GET_PASSWORD_RESET
 * @route http://localhost:5000/api/v1/user/forgot-password
 * @description Verify the email,
 * @parameters email  
 * @returns sucess message email sent
 ******************************************************/

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    const userExists = await userSchema.findOne({ email })
    if (!userExists) throw new Error("No User Exist please Signup", 404)
    const resetToken = randomStringGenerator();
    userExists.forgotPasswordToken = resetToken;
    // {validateBeforeSave: false} because of validation error
    await userExists.save({ validateBeforeSave: false });

    // setting forgotPasswordToken to undefined before sending response back
    userExists.forgotPasswordToken = undefined
    // creating url to sent on mail
    // http://localhost:5000/api/v1/user/reset-password/:userId/:resetToken
    const forgotPasswordUrl =
        `${req.protocol}://${req.get("host")}/api/v1/user/reset-password/${userExists._id}/${resetToken}`

    res.status(200).json({
        success: true,
        message: `Password Reset Token sent to:${userExists.email}`,
        user: userExists,
        forgotPasswordUrl
    })
})


/******************************************************
 * @POST_PASSWORD_RESET
 * @route http://localhost:5000/api/v1/user/reset-password/:userId/:resetToken
 * @description Verify the email,
 * @parameters email , confirmPassword 
 * @returns sucess message email sent
 ******************************************************/
export const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken, userId } = req.params;
    const { password, confirmPassword } = req.body

    if (password !== confirmPassword) throw new Error("Password and confirm password not Match", 401)

    const userExists = await userSchema.findById(userId);

    const isPasswordResetTokenMatch = await userExists.comparePasswordResetToken(resetToken);


    if (!isPasswordResetTokenMatch) throw new Error("Invalid Password Reset Link", 401)

    userExists.password = password;
    userExists.forgotPasswordToken = undefined;
    await userExists.save({ validateBeforeSave: false })

    userExists.password = ""

    res.status(200).json({
        success: true,
        message: "Password Reset Sucesfully",
        user: userExists,
    })
})



/******************************************************
 * @POST_CHANGE_PASSWORD
 * @route http://localhost:5000/api/v1/user/change-password/:userId
 * @description Verify the previous password,
 * @parameters previousPassword , newPassword 
 * @returns success: Password change succesfully
 ******************************************************/
export const changePassword = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    const userExists = await userSchema.findById(userId).select("+password");

    if (!userExists) throw new Error("User  does not exist", 404);

    const isPasswordMatch = await userExists.comparePassword(oldPassword)

    if (!isPasswordMatch) throw new Error("Incorrect Old Password", 401)

    userExists.password = newPassword;

    await userExists.save();

    userExists.password = undefined;

    res.status(200).json({
        success: true,
        message: "Password Change Succesfully",
        user: userExists
    })

})

/******************************************************
 * @GET_USER
 * @route http://localhost:5000/api/v1/user/getUser/:userId
 * @description gives deatils of users,
 * @parameters userId 
 * @returns success: User Details
 ******************************************************/
export const getUser = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!userId) throw new Error("Please Pass UserID", 400);

    const userExists = await userSchema.findById(userId).populate("friends");
    if (!userExists) throw new Error("No such User Exists ", 404);

    res.status(200).json({
        success: true,
        user: userExists,
    })

})


/******************************************************
 * @PUT_USER_UPDATE
 * @route http://localhost:5000/api/v1/user/updateUser/:userId
 * @description update user details,
 * @parameters userId,firstName,lastName,email,location,profileUrl, profession 
 * @returns success: User Details
 ******************************************************/
export const updateUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, location, profileUrl, profession } = req.body
    const { userId } = req.params

    const userExists = await userSchema.findById(userId);
    if (!userExists) throw new Error("Invalid User ", 404);

    const updatedUser = await userSchema.findByIdAndUpdate(userId, req.body);

    res.status(200).json({
        success: true,
        message: "User Updated Sucesfully",
        updateUser
    })


})


/******************************************************
 * @GET_FRIENDS_SUGGESTION
 * @route http://localhost:5000/api/v1/user/friends-suggestion/:userId
 * @description give list of suggested friends,
 * @parameters userId 
 * @returns success: Suggested friends list 
 ******************************************************/
export const suggestFriends = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // here getting the current user details
    const currentUser = await userSchema.findById(userId).populate('friends');

    // here extracting ID's of friends 
    const friendIds = currentUser.friends.map(friend => friend._id);

    // here we are suggesting friends basis of
    // $ne: not equal = This operator is used to select documents where the value of a field is not equal to a specified value.  
    // $nin : not in = This operator is used to select documents where the value of a field is not in a specified array.
    const suggestedFriends = await userSchema
        .find({
            _id: { $ne: userId, $nin: friendIds },
        })
        .limit(15)
        .select("firstName lastName profileUrl profession _id");

    if (suggestedFriends.length === 0) throw new Error("No Friend To suggest ", 200);
    res.status(200).json({
        success: true,
        suggestedFriends,
    });
})

/******************************************************
 * @POST_FRIENDS_REQUEST
 * @route http://localhost:5000/api/v1/user/friendRequest/:userId/:requestedUserId
 * @description sent friends from:userId to:requestedUserId,
 * @parameters userId 
 * @returns success:  Friend Request sent  
 ******************************************************/
export const sentfriendRequest = asyncHandler(async (req, res) => {
    const { userId, requestedUserId } = req.params;

    // checking if requested user already friend
    const user = await userSchema.findById(userId);
    if (!user) throw { message: "No Such User Exist", code: 404 };
    if (user.friends.includes(requestedUserId)) throw { message: "User already friend", code: 400 };

    const requestedUser = await userSchema.findById(requestedUserId);
    if (!user) throw { message: "No Such User Exist", code: 404 };
    if (requestedUser.friends.includes(userId)) throw { message: "User already friend", code: 400 };

    // check if already request sent to particular user
    const requestExist = await friendRequestSchema.findOne({
        requestFrom: userId,
        requestTo: requestedUserId
    });

    if (requestExist) throw new Error("Request Already Sent!", 404,);

    // here checking if the requested user already sent the friends request
    const alreadyRequestExist = await friendRequestSchema.findOne({
        requestFrom: requestedUserId,
        requestTo: userId
    })

    if (alreadyRequestExist) throw new Error("User Already Request to connect", 208);

    const sentRequest = await friendRequestSchema.create({
        requestTo: requestedUserId,
        requestFrom: userId,
    })

    res.status(200).json({
        success: true,
        message: "Friend Request Sent!",
        sentRequest,
    })
})

/******************************************************
 * @GET_All_FRIENDS_REQUEST
 * @route http://localhost:5000/api/v1/user/friendRequest/:userId
 * @description give list of All friends Request,
 * @parameters userId 
 * @returns success: allfriends list 
 ******************************************************/
export const getAllFriendRequest = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const userExists = await userSchema.findById(userId);
    if (!userExists) throw new Error(`User  does not exist`, 404);

    const allFriendRequest = await friendRequestSchema.find({
        requestTo: userId,
        requestStatus: "Pending"
    }).populate("requestFrom", "firstName lastName email profession").limit(10).sort({ _id: -1 });

    if (allFriendRequest.length === 0) throw new Error("No Friend Request", 200);
    res.status(200).json({
        success: true,
        message: "Friend Request Retrieved",
        friendRequest: allFriendRequest
    })

})

/******************************************************
 * @POST_ACCEPT_FRIENDS_REQUEST
 * @route http://localhost:5000/api/v1/user/acceptFriendRequest/:userId/:requestedId
 * @description Accept a friend request ie to:userId and requestedid:requestedId,
 * @parameters userId 
 * @returns success: friend added to rquest
 ******************************************************/
export const acceptFriendRequest = asyncHandler(async (req, res) => {
    const { userId, requestedId } = req.params;
    const { status } = req.body

    if (!status) throw new Error("Status is required", 400);

    const requestExist = await friendRequestSchema.findById(requestedId);
    if (!requestExist) throw new Error("Request does not exist", 404);

    if (status === "Accept") {
        requestExist.requestStatus = "Accept"
        // add the requested user into the user friends list
        const user = await userSchema.findById(userId);
        user.friends.push(requestExist.requestFrom._id)
        await user.save();

        // add the requestfrom user into the userList
        const userfrom = await userSchema.findById(requestExist.requestFrom._id)
        userfrom.friends.push(user._id)
        await userfrom.save();

        await requestExist.deleteOne();
        res.status(200).json({
            success: true,
            message: "Request accepted!",
            requestExist
        })
    } else if (status === "Deny") {
        await requestExist.deleteOne()
        res.status(200).json({
            success: true,
            message: "Request rejected"
        })
    }
})