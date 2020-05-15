export default function({ store, redirect }) {
  console.log("Auth check middleware");

  // If the user is not authenticated
  if (!store.state.auth) {
    return redirect("/login");
  }
}
