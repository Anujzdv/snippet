let editor;
let language = 'python'; // Default language
let likedSnippets = new Set(); // Track liked snippets by id

// Set up ACE editor
window.onload = function() {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/python"); // Default to Python mode

  // Set up boilerplate for each language
  const boilerplates = {
    python: "# Python Boilerplate\n\ndef main():\n    pass\n\nif __name__ == '__main__':\n    main()",
    java: "public class Main {\n    public static void main(String[] args) {\n        // Java Boilerplate\n    }\n}",
    c: "#include <stdio.h>\n\nint main() {\n    // C Boilerplate\n    return 0;\n}",
    cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // C++ Boilerplate\n    return 0;\n}"
  };

  // Set initial boilerplate
  editor.setValue(boilerplates[language], -1);
};

// Function to change language
function setLanguage(lang) {
  language = lang;
  editor.session.setMode(`ace/mode/${lang}`);

  const boilerplates = {
    python: 'printf("Welcome to Syntax|Flow")',
    java: 'public class Main { \n public static void main(String[] args) {\n System.out.println("Welcome to Syntax|Flow");\n}\n}',
    c: "#include <stdio.h>\n\nint main() {\n    // C Boilerplate\n    return 0;\n}",
    cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // C++ Boilerplate\n    return 0;\n}"
  };

  // Set the appropriate boilerplate for the selected language
  editor.setValue(boilerplates[lang], -1);
}

// Handle Snippet submission
document.getElementById('submit').addEventListener('click', function() {
  const snippetContent = editor.getValue();
  const snippetId = Date.now();
  const snippetCard = document.createElement('div');
  snippetCard.classList.add('snippet-card');
  snippetCard.innerHTML = `
    <pre>${snippetContent}</pre>
    <button class="like-btn" onclick="toggleLike(${snippetId}, this)">Like</button>
    <button class="follow-btn" onclick="toggleFollow(${snippetId}, this)">Follow</button>
    <button class="comment-btn" onclick="toggleCommentBox(${snippetId})">Comment</button>
    <div class="comments-container" id="comments-${snippetId}"></div>
    <div id="comment-input-${snippetId}" class="comment-input" style="display:none;">
      <input type="text" id="comment-text-${snippetId}" placeholder="Add your comment..." />
      <button onclick="submitComment(${snippetId})">Submit</button>
    </div>
  `;
  document.querySelector('.snippets-list').appendChild(snippetCard);
});

// Toggle Like functionality
function toggleLike(snippetId, btn) {
  if (likedSnippets.has(snippetId)) {
    likedSnippets.delete(snippetId);
    btn.textContent = 'Like';
  } else {
    likedSnippets.add(snippetId);
    btn.textContent = 'Unlike';
  }
}

// Toggle Follow functionality
function toggleFollow(snippetId, btn) {
  if (btn.textContent === 'Follow') {
    btn.textContent = 'Unfollow';
  } else {
    btn.textContent = 'Follow';
  }
}

// Show or hide comment input box
function toggleCommentBox(snippetId) {
  const commentBox = document.getElementById(`comment-input-${snippetId}`);
  commentBox.style.display = commentBox.style.display === 'none' ? 'block' : 'none';
}

// Submit comment
function submitComment(snippetId) {
  const commentText = document.getElementById(`comment-text-${snippetId}`).value;
  if (commentText) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.textContent = commentText;
    document.getElementById(`comments-${snippetId}`).appendChild(commentDiv);
    document.getElementById(`comment-input-${snippetId}`).style.display = 'none';
  }
}
