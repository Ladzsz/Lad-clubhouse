import "../assets/styles/home.css";
import { Link } from "react-router-dom";

function Home({loggedin}) {
  return (
    <>
      <header>
        {/*text section*/}
        <div className="home-text-div">
          <h1 className="home-h1">WELCOME TO SCREECH</h1>

          <p className="home-p">
            Look i know already life sucks. shit happens, and things just keep
            pissing us off. The bad things in life are unavoidable, however this
            does not mean you have to suffer in silence! using screech you can
            effectivley bitch about all your problems here! make an account and
            start complaining about well anything really! Wether your wife
            cheated on you with her coworker or are you the wife fucking the
            coworker screech is here for you to let all that frustration out!
          </p>
        </div>
      </header>

      {/*button section*/}
      <section className="home-btn-sec">
        <div className="home-btn-container">
          <Link to="signup">
            <button className="home-btn">Sign up!</button>
          </Link>

          {loggedin ? (
        <Link to="posts">
            <button className="home-btn">View Posts!</button>
          </Link>
      ) : (
        <Link to="login">
            <button className="home-btn">Log in!</button>
          </Link>
      )}

        </div>
      </section>
    </>
  );
}

export default Home;
