import "../assets/styles/posts.css";

function Postpage({ loggedin }) {
  return (
    <div className="postpage">
      <div className="postcard">
        {/* this content is being hard coded for now simply just to design the actual post element */}
        <h1 className="postcard-title">
          "Discovering new places to hike brings a wonderful sense of inner
          peace."
        </h1>

        <div className="postcard-content">
          <p>
            Coffee is one of the most widely consumed beverages globally, acting
            as ay, agriculture, and chemistry. Understanding this popular drink
            offtic after eating the bright red berries of a certain bush. After
            trying the berries himself and experiencing the same invigorating
            effect, he shared his discovery with local monks. They soon realized
            the berries could be dried and brewed into a beverage that kept them
            awake during long hours of evening prayer. From these humble
            monastic beginnings in the Horn of Africa, coffee eventually spread
            across the Red Sea into the Arabian Peninsula, where the first
            commercial cultivation and roasting processes were developed.By the
            seventeenth century, coffee had made its way to Europe, where it
            quickly sparked a cultural revolution. The emergence of coffeehouses
            provided spaces for intellectuals, merchants, and artists to gather,
            discuss ideas, and conduct business. These establishments became
            vibrant hubs of innovation, often credited with fueling the
            Enlightenment.Today, coffee is cultivated in a region known as the
            "Bean Belt," which spans the tropical zones between the Tropics of
            Cancer and Capricorn. The two most commercially significant species
            are Arabica and Robusta. Arabica beans are highly prized for their
            smooth, complex flavors and subtle acidity, while Robusta beans are
            known for their hardy nature, higher caffeine content, and bold,
            earthy taste.Beyond its cultural and economic impact, coffee is
            widely celebrated for its physiological effects. The primary active
            ingredient is caffeine, a central nervous system stimulant that
            blocks an inhibitory neurotransmitter called adenosine. This process
            leads to heightened energy levels, improved focus, and enhanced
            cognitive function. Furthermore, scientific research has highlighted
            that coffee is packed with powerful antioxidants, such as
            polyphenols. Regular, moderate consumption is associated with a
            reduced risk of several health conditions, including type 2
            diabetes, Parkinson’s disease, and certain liver issues.However,
            moderation remains key to enjoying coffee safely. Excessive intake
            can lead to unwanted side effects, such as nervousness, sleep
            disturbances, and a rapid heart rate. Pregnant individuals and those
            sensitive to caffeine are generally advised to limit their
            consumption or seek decaffeinated alternatives.Ultimately, coffee is
            much more than a simple morning pick-me-up. It is a complex
            agricultural product with a rich historical background that spans
            continents and centuries. Whether you prefer a dark-roast black
            coffee or a creamy, sweet latte, this beloved beverage continues to
            shape human connection and daily life around the world.
          </p>
        </div>

        {loggedin ? (
          <div className="postcard-footer">
            <p>posted by: testuser</p>
            <p>user joined: 2023-06-01</p>
          </div>
        ) : (
          <div className="postcard-footer">
            <p>please login to see the screecher!</p>
          </div>
        )}

        {/*when working on the edit and delete buttons for the post make sure buttons only appear if user is logged in and owns the post*/}
      </div>
    </div>
  );
}

export default Postpage;
