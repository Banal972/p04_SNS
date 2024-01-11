export default function Feed({feed}) {
  return (
    <div className="feed">
        {
            feed.map((e,i)=>(
                <div className='col' key={i}>
                  <div className={`img ${e.filter}`} style={{backgroundImage : `url(${e.imgURL})`}}></div>
                </div>
            ))
        }
    </div>
  )
}
