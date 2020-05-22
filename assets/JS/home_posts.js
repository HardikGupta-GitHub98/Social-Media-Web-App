{
	let createPost = function () {
		let newPostForm = $("#new-post-create");
		//  To prevent the default action of the form to submit the form
		// And Create A new Post
		newPostForm.submit(function (event) {
			event.preventDefault();

			$.ajax({
				type: "post",
				url: "/posts/create",
				data: newPostForm.serialize,
			});
		});
	};

	createPost();
}
