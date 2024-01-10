export default function Feed({feed}) {
  return (
    <div className="feed">
        {
            feed.map((e,i)=>(
                <div className="col" key={i} style={{backgroundImage : `url()`}}></div>
            ))
        }
    </div>
  )
}
