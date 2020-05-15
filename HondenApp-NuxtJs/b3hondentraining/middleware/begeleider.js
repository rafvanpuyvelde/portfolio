export default function({ store, redirect }) {
  console.log("Begeleider check middleware");

  // If the user is not a 'begeleider'
  if (store.state.auth.roleId !== 2) {
    return redirect("/");
  }
}
