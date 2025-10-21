function startCamera() {
  const videoElement = document.getElementById('webcam');

  const hands = new Hands({
    locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });
  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  });

  hands.onResults(results => {
    if (results.multiHandLandmarks?.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      const gesture = classifyGesture(landmarks);
      showGestureIcon(gesture);
      checkAnswer(gesture);
    }
  });

  navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    videoElement.srcObject = stream;

    videoElement.onloadeddata = () => {
      // Guna requestAnimationFrame untuk hantar frame ke MediaPipe
      function sendFrame() {
        hands.send({ image: videoElement });
        requestAnimationFrame(sendFrame);
      }
      sendFrame();
    };
  })
  .catch(err => {
    alert("❌ Tak dapat akses kamera.");
    console.error("Camera error:", err);
  });


  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      startCamera();
    }
  });
}
