export default function BottomSheet({ ids }) {
  return (
    <div>{ids.map(id => <div key={id}>{id}</div>)}</div>
  )
}
