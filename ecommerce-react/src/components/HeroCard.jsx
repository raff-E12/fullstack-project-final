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
            <p className="lead text-center my-5 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              itaque consequuntur culpa, obcaecati qui, at est pariatur, ipsa
              dicta laboriosam cupiditate quam natus perferendis iste incidunt
              alias molestias corporis fugit.
            </p>
          </div>
        </div>

        <div className="row py-5">
          <div className="col-md-6">
            <div className="placeholder-img shadow rounded h-100 position-relative" >
              <button className="btn btn-light position absolute bottom-0 start-0 m-3">dressses</button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row h-100">
              <div className="col-12 mb-3">
                <div className="placeholder-img rounded position-relative" >
                  <button className="btn btn-light position absolute bottom-0 start-0 m-3">watches</button>
                </div>
              </div>
              <div className="col-12">
                <div className="placeholder-img rounded position-relative" >
                  <button className="btn btn-light position absolute bottom-0 start-0 m-3">sneakers</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCard;
