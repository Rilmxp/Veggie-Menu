import { useSelector } from "react-redux";

const Account = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <main>
      <h1>Welcome {user && user.username}</h1>
      <p>
        This is your reserved area where you can manage your account and see all
        your favourites recipes.
      </p>
    </main>
  );
};

export default Account;
