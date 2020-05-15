export default function({ store, redirect }) {
  console.log("Trainer check middleware");

  // If the user is not a 'trainer'
  if (store.state.auth.roleId !== 1) {
    return redirect("/");
  }
}
