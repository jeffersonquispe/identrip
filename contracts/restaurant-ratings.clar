;; restaurant-ratings contract
(define-map restaurant-ratings
    { restaurant-id: uint }
    {
        total-ratings: uint,
        sum-ratings: uint,
        average: uint
    }
)

(define-public (update-rating (restaurant-id uint) (new-rating uint))
    (let
        ((current-stats (default-to
            { total-ratings: u0, sum-ratings: u0, average: u0 }
            (map-get? restaurant-ratings { restaurant-id: restaurant-id }))))
        (begin
            (asserts! (and (>= new-rating u1) (<= new-rating u5)) (err u1))
            (map-set restaurant-ratings
                { restaurant-id: restaurant-id }
                {
                    total-ratings: (+ (get total-ratings current-stats) u1),
                    sum-ratings: (+ (get sum-ratings current-stats) new-rating),
                    average: (/ (+ (get sum-ratings current-stats) new-rating)
                              (+ (get total-ratings current-stats) u1))
                }
            )
            (ok true)
        )
    )
)

(define-read-only (get-restaurant-rating (restaurant-id uint))
    (map-get? restaurant-ratings { restaurant-id: restaurant-id })
) 