function classifyGesture(landmarks) {
  if (!landmarks || landmarks.length < 21) return -1;
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  const fingers = [
    dist(landmarks[4], landmarks[0]) > 0.1,
    dist(landmarks[8], landmarks[0]) > 0.1,
    dist(landmarks[12], landmarks[0]) > 0.1,
    dist(landmarks[16], landmarks[0]) > 0.1,
    dist(landmarks[20], landmarks[0]) > 0.1
  ];

  if (fingers.every(f => f)) return 0; // ✋
  if (fingers[1] && fingers[2] && !fingers[3] && !fingers[4]) return 1; // ✌️
  if (fingers[1] && !fingers[2] && !fingers[3]) return 2; // ☝️
  if (fingers[1] && fingers[4] && !fingers[2] && !fingers[3]) return 3; // 🤟

  return -1;
}
