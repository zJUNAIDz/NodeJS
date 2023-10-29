async function fetchUser(username, callback) {
  const user = await fetch(` https://api.github.com/users/${username}`);
  callback(user);
}
fetchUser("zjunaidz", (user) => {
  const name = user.name;
  console.log(name);
});
