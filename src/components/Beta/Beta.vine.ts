function Beta() {
  const useAiBg = vineProp.optional<boolean>()

  vineStyle.scoped(scss`
    $aibg: conic-gradient(
      from 225deg,
      #5fb3ff,
      #ffb347,
      #ff4d6d,
      #a855f7,
      #5fb3ff
    );

    .aibg {
      background: $aibg;
    }
  `)

  return vine`
    <div :class="useAiBg ? 'aibg' : ''" text-2 c="white dark:#333" bg="primary-d dark:primary-a" p-1 rounded-1 m-.5 font-bold h-2>
      Beta
    </div>
  `
}

export default Beta
