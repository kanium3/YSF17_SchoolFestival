export default function Spacer({ type }) {
  const gap = {
    S: '10px',
    M: '30px',
    L: '70px',
  }[type]

  return (
    <div style={
      {
        width: '100%',
        marginBottom: gap,
      }
    }
    >
    </div>
  )
}
