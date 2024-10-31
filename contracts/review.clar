(define-map restaurant-reviews
  { restaurant: principal, reviewer: principal } 
  { rating: uint, comment: (string-ascii 256), date: uint })

(define-public (add-review (restaurant principal) (rating uint) (comment (string-ascii 256)) (date uint))
  (begin
    (asserts! (<= rating u5) (err u100))
    (asserts! (>= rating u1) (err u101))
    (map-set restaurant-reviews
      { restaurant: restaurant, reviewer: tx-sender }
      { rating: rating, comment: comment, date: date })
    (ok { message: "Review added successfully" })
  )
)

(define-read-only (get-review (restaurant principal) (reviewer principal))
  (match (map-get? restaurant-reviews { restaurant: restaurant, reviewer: reviewer })
    review (ok review)
    (err u102))
)
