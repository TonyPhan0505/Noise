/////////////// Import dependencies ///////////////
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
/////////////////////////////////////////////////

//////////////////////////////// Configurations /////////////////////////////////
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const mongoUSERNAME = process.env.MONGO_USER;
const mongoPASS = process.env.MONGO_PASSWORD;
const mongoURI = `mongodb+srv://${mongoUSERNAME}:${mongoPASS}@noise.jdnenrr.mongodb.net/production?retryWrites=true&w=majority`;
////////////////////////////////////////////////////////////////////////////////

//////////////////////////// Database connection /////////////////////////
mongoose.connect(mongoURI)
.then(
	() => {
        console.log('Connected successfully to mongodb.');
    },
	( err ) => {
        console.log(`Failed to connect to mongodb. Error: ${err}`);
    }
);
/////////////////////////////////////////////////////////////////////////

///////////////////// Import routes ////////////////////
const UserRouter = require('./routes/user.route');
const StoryRouter = require('./routes/story.route');
const PostRouter = require('./routes/post.route');
const MomentRouter = require('./routes/moment.route');
const CommentRouter = require('./routes/comment.route');
const ActivityRouter = require('./routes/activity.route');
const InterestRouter = require('./routes/interest.route');
const DreamRouter = require('./routes/dream.route');
const NotificationRouter = require('./routes/notification.route');
const TrophyRouter = require('./routes/trophy.route');
const ViewRouter = require('./routes/view.route');
const AdminRouter = require('./routes/admin.route');
const InterestCategoryRouter = require('./routes/InterestCategory.route');
const VerificationRouter = require('./routes/verification.route');
///////////////////////////////////////////////////////

///////////////////////////////// Middleware ///////////////////////////////////
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.listen(port, () => console.log('RESTful API server started on: ' + port + '.'));
app.use('/user', UserRouter);
app.use('/story', StoryRouter);
app.use('/post', PostRouter);
app.use('/moment', MomentRouter);
app.use('/comment', CommentRouter);
app.use('/activity', ActivityRouter);
app.use('/interest', InterestRouter);
app.use('/dream', DreamRouter);
app.use('/notification', NotificationRouter);
app.use('/trophy', TrophyRouter);
app.use('/view', ViewRouter);
app.use('/admin', AdminRouter);
app.use('/interestCategory', InterestCategoryRouter);
app.use('/verification', VerificationRouter);
///////////////////////////////////////////////////////////////////////////////