import "../style/HeroCard.css";

function HeroCard() {
  return (
    <section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <h1 className="display-4 fw-bold text-center my-5">
              Le nostre collezioni
            </h1>
          </div>
          <div className="col-6">
            <p className="lead text-center my-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              itaque consequuntur culpa, obcaecati qui, at est pariatur, ipsa
              dicta laboriosam cupiditate quam natus perferendis iste incidunt
              alias molestias corporis fugit.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <img
              src="https://th.bing.com/th/id/OIP.vQ9-B6jXvwsS6bhvOnfqJQHaLW?w=201&h=309&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="woman-dress"
              className="img-fluid rounded shadow h-100"
            />
          </div>

          <div className="col-md-6">
            <div className="row h-100">
              <div className="col-12">
                <img
                  src="https://th.bing.com/th/id/OIP.vQ9-B6jXvwsS6bhvOnfqJQHaLW?w=201&h=309&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  alt="woman-dress"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-12">
                <img
                  src="https://th.bing.com/th/id/OIP.vQ9-B6jXvwsS6bhvOnfqJQHaLW?w=201&h=309&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  alt="woman-dress"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCard;
