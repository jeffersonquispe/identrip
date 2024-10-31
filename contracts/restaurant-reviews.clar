;; restaurant-reviews contract
(define-data-var last-review-id uint u0)

(define-map reviews
    { review-id: uint }
    {
        restaurant-id: uint,
        reviewer: principal,
        rating: uint,
        comment: (string-utf8 280),
        timestamp: uint
    }
)

(define-public (add-review (restaurant-id uint) (rating uint) (comment (string-utf8 280)))
    (let
        ((review-id (+ (var-get last-review-id) u1)))
        (begin
            (asserts! (and (>= rating u1) (<= rating u5)) (err u1)) ;; rating must be 1-5
            (map-set reviews
                { review-id: review-id }
                {
                    restaurant-id: restaurant-id,
                    reviewer: tx-sender,
                    rating: rating,
                    comment: comment,
                    timestamp: block-height
                }
            )
            (var-set last-review-id review-id)
            (ok review-id)
        )
    )
)

(define-read-only (get-review (review-id uint))
    (map-get? reviews { review-id: review-id })
) 