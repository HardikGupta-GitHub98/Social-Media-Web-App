{
	// Method TO submit the Form data Using AJAX
	let createPost = function () {
		let newPostForm = $("#new-post-create");
		//  To prevent the default action of the form to submit the form
		// And Create A new Post
		newPostForm.submit(function (event) {
			event.preventDefault();

			$.ajax({
				type: "post",
				url: "/posts/create",
				data: newPostForm.serialize(),
				success: function (data) {
					let newPost = newPostDOM(data.data.post);
					$("#user-post-container").prepend(newPost);
				},
				error: function (error) {
					console.log(error.responseText);
				},
			});
		});
	};

	let newPostDOM = function (post) {
		return $(`<div id="post-${post._id}">
						<p>
							
							<a href="/posts/deletePost/${post.id}">X</a>
							${post.content}
							<br />
							${post.user.name}
						</p>

						
						<form action="/comments/addComment" method="post">
							<input type="text" name="content" id="" placeholder="Comment" />
							<input type="hidden" name="postID" value="${post._id}" />
							<button type="submit" value="comment">Add</button>
						</form>
	

				  </div>`);
	};

	createPost();
}
