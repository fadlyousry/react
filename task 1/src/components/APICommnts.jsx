export function fetchComments(videoId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allComments = {
        1: ["This really clarified things!", "Amazing breakdown, thanks!"],
        2: ["I was stuck before this. Lifesaver!", "Now it finally makes sense."],
        3: ["Brilliant explanation!", "I love the way you teach."],
        4: ["Could you dive deeper next time?", "Short but super useful!"],
        5: ["Please cover React Native next!", "Just what I needed today."],
        6: ["Instant like from me!", "Your examples are always spot on."]
      };
      resolve(allComments[videoId] || []);
    }, 800);
  });
}
