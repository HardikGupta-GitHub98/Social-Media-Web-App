const queue = require("../config/kue");
const commentsMailer = require("../mailers/comments_mailer");

queue.process("email", function (job, done) {
	console.log("Emails Worker Working", job.data);
	commentsMailer.newComment(job.data);
	done();
});
