function useGreeting() {
  return Math.random() > 0.5 ? 'Hi there' : 'Hello'
}

export { useGreeting }
