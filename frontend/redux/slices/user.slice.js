import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: {},
        searchedUsers: [],
        usersWithInterestX: [],
        mutualInterestsUsers: [],
        followers: [], // might not be the list of followers of the current user
        followings: [], // might not be the list of followings of the current user
        hasSearched: 2, // 0 = failed to search, 1 = successfully searched, 2 = waiting
        hasFetchedMutualInterestsUsers: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasFetchedFollowers: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasFetchedMoreFollowers: 2, // 0 = failed to fetch more, 1 = successfully fetched more, 2 = waiting
        hasFetchedFollowings: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasFetchedMoreFollowings: 2, // 0 = failed to fetch more, 1 = successfully fetched more, 2 = waiting
        isLoggedIn: 2, // 0 = failed to login, 1 = successfully logged in, 2 = waiting for credentials
        hasSignedUp: 2, // 0 = failed to sign up, 1 = successfully signed up, 2 = waiting for credentials
        hasVerifiedAccount: 2, // 0 = failed to verify account, 1 = successfully verified account, 2 = waiting for credentials
        hasUpdatedProfile: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasAddedActivity: 2, // 0 = failed to add activity, 1 = successfully added activity, 2 = waiting
        hasDeletedActivity: 2, // 0 = failed to delete activity, 1 = successfully deleted activity, 2 = waiting
        hasCommented: 2, // 0 = failed to comment, 1 = successfully commented, 2 = waiting
        hasDeletedComment: 2, // 0 = failed to delete comment, 1 = successfully deleted comment, 2 = waiting
        hasAddedDream: 2, // 0 = failed to add dream, 1 = successfully added dream, 2 = waiting
        hasDeletedDream: 2, // 0 = failed to delete dream, 1 = successfully deleted dream, 2 = waiting
        hasAddedInterest: 2, // 0 = failed to add interest, 1 = successfully added interest, 2 = waiting
        hasDeletedInterest: 2, // 0 = failed to delete interest, 1 = successfully deleted interest, 2 = waiting
        hasAddedMoment: 2, // 0 = failed to add moment, 1 = successfully added moment, 2 = waiting
        hasDeletedMoment: 2, // 0 = failed to delete moment, 1 = successfully deleted moment, 2 = waiting
        hasAddedPost: 2, // 0 = failed to add post, 1 = successfully added post, 2 = waiting
        hasDeletedPost: 2, // 0 = failed to delete post, 1 = successfully deleted post, 2 = waiting
        hasAddedStory: 2, // 0 = failed to add story, 1 = successfully added story, 2 = waiting
        hasDeletedStory: 2, // 0 = failed to delete story, 1 = successfully deleted story, 2 = waiting
        hasAddedTrophy: 2, // 0 = failed to add trophy, 1 = successfully added trophy, 2 = waiting
        hasDeletedTrophy: 2, // 0 = failed to delete trophy, 1 = successfully deleted trophy, 2 = waiting
        hasFollowed: 2, // 0 = failed to follow, 1 = successfully followed, 2 = waiting
        hasUnfollowed: 2, // 0 = failed to follow, 1 = successfully followed, 2 = waiting
        hasWatched: 2, // 0 = failed to watch, 1 = successfully watched, 2 = waiting
        hasUnwatched: 2, // 0 = failed to unwatch, 1 = successfully unwatched, 2 = waiting
        userExists: 3, // 0 = failed to determine, 1 = exists, 2 = doesn't exist, 3 = waiting
        hasSearchedUsersWithInterestX: 2, // 0 = failed to search, 1 = successfully searched, 2 = waiting
        hasSearchedMoreUsersWithInterestX: 2 // 0 = failed to search more, 1 = successfully searched more, 2 = waiting
    },
    reducers: {
        searchReducer: (state, action) => {
            const { status, users } = action.payload;
            if (status === 1) { state.searchedUsers = users; }
            state.hasSearched = status;
        },
        resetSearchReducer: (state) => {
            state.hasSearched = 2;
        },
        fetchMutualInterestsUsersReducer: (state, action) => {
            const { status, users } = action.payload;
            if (status === 1) { state.mutualInterestsUsers = users; }
            state.hasFetchedMutualInterestsUsers = status;
        },
        resetFetchMutualInterestsUsersReducer: (state) => {
            state.hasFetchedMutualInterestsUsers = 2;
        },
        loginReducer: (state, action) => {
            const { status, user } = action.payload;
            if (status === 1) { state.currentUser = user; }
            state.isLoggedIn = status;
        },
        resetLoginReducer: (state) => {
            state.isLoggedIn = 2;
        },
        signUpReducer: (state, action) => {
            const status = action.payload;
            state.hasSignedUp = status;
        },
        resetSignUpReducer: (state) => {
            state.hasSignedUp = 2;
        },
        verifyAccountReducer: (state, action) => {
            const status = action.payload;
            state.hasVerifiedAccount = status;
        },
        resetVerifyAccountReducer: (state) => {
            state.hasVerifiedAccount = 2;
        },
        updateProfileReducer: (state, action) => {
            const { status, user } = action.payload;
            if (status === 1) { state.currentUser = user; }
            state.hasUpdatedProfile = status;
        },
        resetUpdateProfileReducer: (state) => {
            state.hasUpdatedProfile = 2;
        },
        addActivityReducer: (state, action) => {
            const { status, activityId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.activities.unshift(activityId);
                state.currentUser = updatedCurrentUser;
            }
            state.hasAddedActivity = status;
        },
        resetAddActivityReducer: (state) => {
            state.hasAddedActivity = 2;
        },
        deleteActivityReducer: (state, action) => {
            const { status, activityId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.activities = updatedCurrentUser.activities.filter((id) => { return id !== activityId });
                state.currentUser = updatedCurrentUser;
            }
            state.hasDeletedActivity = status;
        },
        commentReducer: (state, action) => {
            const { status, commentId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.comments.unshift(commentId);
                state.currentUser = updatedCurrentUser;
            }
            state.hasCommented = status;
        },
        resetCommentReducer: (state) => {
            state.hasCommented = 2;
        },
        deleteCommentReducer: (state, action) => {
            const { status, commentId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.comments = updatedCurrentUser.comments.filter((id) => { return id !== commentId });
                state.currentUser = updatedCurrentUser;
            }
            state.hasDeletedComment = status;
        },
        resetDeleteActivityReducer: (state) => {
            state.hasDeletedComment = 2;
        },
        resetDeleteCommentReducer: (state) => {
            state.hasDeletedComment = 2;
        },
        addDreamReducer: (state, action) => {
            const { status, dreamId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.dreams.unshift(dreamId);
                state.currentUser = updatedCurrentUser;
            }
            state.hasAddedDream = status;
        },
        resetAddDreamReducer: (state) => {
            state.hasAddedDream = 2;
        },
        deleteDreamReducer: (state, action) => {
            const { status, dreamId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.dreams = updatedCurrentUser.dreams.filter((id) => { return id !== dreamId });
                state.currentUser = updatedCurrentUser;
            }
            state.hasDeletedDream = status;
        },
        resetDeleteDreamReducer: (state) => {
            state.hasDeletedDream = 2;
        },
        addInterestReducer: (state, action) => {
            const { status, interestName } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.interests.unshift(interestName);
                state.currentUser = updatedCurrentUser;
            }
            state.hasAddedInterest = status;
        },
        resetAddInterestReducer: (state) => {
            state.hasAddedInterest = 2;
        },
        deleteInterestReducer: (state, action) => {
            const { status, interestName } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.interests = updatedCurrentUser.interests.filter((e) => { return e !== interestName });
                state.currentUser = updatedCurrentUser;
            }
            state.hasDeletedInterest = status;
        },
        resetDeleteInterestReducer: (state) => {
            state.hasDeletedInterest = 2;
        },
        addMomentReducer: (state, action) => {
            const { status, momentId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.moments.unshift(momentId);
                state.currentUser = updatedCurrentUser;
            }
            state.hasAddedMoment = status;
        },
        resetAddMomentReducer: (state) => {
            state.hasAddedMoment = 2;
        },
        deleteMomentReducer: (state, action) => {
            const { status, momentId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.moments = updatedCurrentUser.moments.filter((id) => { return id !== momentId });
                state.currentUser = updatedCurrentUser;
            }
            state.hasDeletedMoment = status;
        },
        resetDeleteMomentReducer: (state) => {
            state.hasDeletedMoment = 2;
        },
        addPostReducer: (state, action) => {
            const { status, postId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.posts.unshift(postId);
                state.currentUser = updatedCurrentUser;
            }
            state.hasAddedPost = status;
        },
        resetAddPostReducer: (state) => {
            state.hasAddedPost = 2;
        },
        deletePostReducer: (state, action) => {
            const { status, postId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.posts = updatedCurrentUser.posts.filter((id) => { return id !== postId });
                state.currentUser = updatedCurrentUser;
            }
            state.hasDeletedPost = status;
        },
        resetDeletePostReducer: (state) => {
            state.hasDeletedPost = 2;
        },
        addStoryReducer: (state, action) => {
            const { status, storyId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.stories.unshift(storyId);
                state.currentUser = updatedCurrentUser;
            }
            state.hasAddedStory = status;
        },
        resetAddStoryReducer: (state) => {
            state.hasAddedStory = 2;
        },
        deleteStoryReducer: (state, action) => {
            const { status, storyId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.stories = updatedCurrentUser.stories.filter((id) => { return id !== storyId });
                state.currentUser = updatedCurrentUser;
            }
            state.hasDeletedStory = status;
        },
        resetDeleteStoryReducer: (state) => {
            state.hasDeletedStory = 2;
        },
        addTrophyReducer: (state, action) => {
            const { status, trophyId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.trophies.unshift(trophyId);
                state.currentUser = updatedCurrentUser;
            }
            state.hasAddedTrophy = status;
        },
        resetAddTrophyReducer: (state) => {
            state.hasAddedTrophy = 2;
        },
        deleteTrophyReducer: (state, action) => {
            const { status, trophyId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.trophies = updatedCurrentUser.trophies.filter((id) => { return id !== trophyId });
                state.currentUser = updatedCurrentUser;
            }
            state.hasDeletedTrophy = status;
        },
        resetDeleteTrophyReducer: (state) => {
            state.hasDeletedTrophy = 2;
        },
        followReducer: (state, action) => {
            const { status, followedUsername } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.followings.unshift(followedUsername);
                updatedCurrentUser.numOfFollowings = updatedCurrentUser.numOfFollowings + 1;
                state.currentUser = updatedCurrentUser;
            }
            state.hasFollowed = status;
        },
        resetFollowReducer: (state) => {
            state.hasFollowed = 2;
        },
        fetchFollowersReducer: (state, action) => {
            const { status, followers } = action.payload;
            if (status === 1) { state.followers = followers; }
            state.hasFetchedFollowers = status;
        },
        resetFetchFollowersReducer: (state) => {
            state.hasFetchedFollowers = 2;
        },
        fetchMoreFollowersReducer: (state, action) => {
            const { status, followers } = action.payload;
            if (status === 1) {
                let updatedFollowers = [...state.followers];
                if (updatedFollowers.length >= 60) {
                    updatedFollowers = followers;
                } else {
                    updatedFollowers = updatedFollowers.concat(followers);
                }
                state.followers = updatedFollowers;
            }
            state.hasFetchedMoreFollowers = status;
        },
        resetFetchMoreFollowersReducer: (state) => {
            state.hasFetchedMoreFollowers = 2;
        },
        fetchFollowingsReducer: (state, action) => {
            const { status, followings } = action.payload;
            if (status === 1) { state.followings = followings; }
            state.hasFetchedFollowings = status;
        },
        resetFetchFollowingsReducer: (state) => {
            state.hasFetchedFollowings = 2;
        },
        fetchMoreFollowingsReducer: (state, action) => {
            const { status, followings } = action.payload;
            if (status === 1) {
                let updatedFollowings = [...state.followings];
                if (updatedFollowings.length >= 60) {
                    updatedFollowings = followings;
                } else {
                    updatedFollowings = updatedFollowings.concat(followings);
                }
                state.followings = updatedFollowings;
            }
            state.hasFetchedMoreFollowings = status;
        },
        resetFetchMoreFollowingsReducer: (state) => {
            state.hasFetchedMoreFollowings = 2;
        },
        unfollowReducer: (state, action) => {
            const { status, followedUsername } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.followings = updatedCurrentUser.followings.filter((username) => { return username !== followedUsername });
                updatedCurrentUser.numOfFollowings = updatedCurrentUser.numOfFollowings - 1;
                state.currentUser = updatedCurrentUser;
            }
            state.hasUnfollowed = status;
        },
        resetUnfollowReducer: (state) => {
            state.hasUnfollowed = 2;
        },
        watchStoryReducer: (state, action) => {
            const { status, storyId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.watchings.unshift(storyId);
                state.currentUser = updatedCurrentUser;
            }
            state.hasWatched = status;
        },
        resetWatchStoryReducer: (state) => {
            state.hasWatched = 2;
        },
        unwatchStoryReducer: (state, action) => {
            const { status, storyId } = action.payload;
            if (status === 1) {
                let updatedCurrentUser = {...state.currentUser};
                updatedCurrentUser.watchings = updatedCurrentUser.watchings.filter((id) => { return id !== storyId });
                state.currentUser = updatedCurrentUser;
            }
            state.hasUnwatched = status;
        },
        resetUnwatchStoryReducer: (state) => {
            state.hasUnwatched = 2;
        },
        doesUserExistReducer: (state, action) => {
            const exists = action.payload;
            state.userExists = exists;
        },
        resetDoesUserExistReducer: (state) => {
            state.userExists = 3;
        },
        searchUsersWithInterestXReducer: (state, action) => {
            const { status, users } = action.payload;
            if (status === 1) { state.usersWithInterestX = users; }
            state.hasSearchedUsersWithInterestX = status;
        },
        resetSearchUsersWithInterestXReducer: (state) => {
            state.hasSearchedUsersWithInterestX = 2;
        },
        searchMoreUsersWithInterestXReducer: (state, action) => {
            const { status, users } = action.payload;
            if (status === 1) {
                const updatedUsersWithInterestX = [...state.usersWithInterestX];
                state.usersWithInterestX = updatedUsersWithInterestX.concat(users);
            }
            state.hasSearchedMoreUsersWithInterestX = status;
        },
        resetSearchMoreUsersWithInterestXReducer: (state) => {
            state.hasSearchedMoreUsersWithInterestX = 2;
        }
    }
});

export const {
    searchReducer,
    resetSearchReducer,
    fetchMutualInterestsUsersReducer,
    resetFetchMutualInterestsUsersReducer,
    loginReducer,
    resetLoginReducer,
    signUpReducer,
    resetSignUpReducer,
    verifyAccountReducer,
    resetVerifyAccountReducer,
    updateProfileReducer,
    resetUpdateProfileReducer,

    addActivityReducer,
    resetAddActivityReducer,
    deleteActivityReducer,
    resetDeleteActivityReducer,

    commentReducer,
    resetCommentReducer,
    deleteCommentReducer,
    resetDeleteCommentReducer,

    addDreamReducer,
    resetAddDreamReducer,
    deleteDreamReducer,
    resetDeleteDreamReducer,

    addInterestReducer,
    resetAddInterestReducer,
    deleteInterestReducer,
    resetDeleteInterestReducer,

    addMomentReducer,
    resetAddMomentReducer,
    deleteMomentReducer,
    resetDeleteMomentReducer,

    addPostReducer,
    resetAddPostReducer,
    deletePostReducer,
    resetDeletePostReducer,

    addStoryReducer,
    resetAddStoryReducer,
    deleteStoryReducer,
    resetDeleteStoryReducer,

    addTrophyReducer,
    resetAddTrophyReducer,
    deleteTrophyReducer,
    resetDeleteTrophyReducer,

    followReducer,
    resetFollowReducer,
    fetchFollowersReducer,
    resetFetchFollowersReducer,
    fetchMoreFollowersReducer,
    resetFetchMoreFollowersReducer,
    fetchFollowingsReducer,
    resetFetchFollowingsReducer,
    fetchMoreFollowingsReducer,
    resetFetchMoreFollowingsReducer,
    unfollowReducer,
    resetUnfollowReducer,

    watchStoryReducer,
    resetWatchStoryReducer,
    unwatchStoryReducer,
    resetUnwatchStoryReducer,

    doesUserExistReducer,
    resetDoesUserExistReducer,

    searchUsersWithInterestXReducer,
    resetSearchUsersWithInterestXReducer,
    searchMoreUsersWithInterestXReducer,
    resetSearchMoreUsersWithInterestXReducer
} = userSlice.actions;

export default userSlice.reducer;