mod p1 {
    pub fn sum_multiples(n: i32) -> i32 {
        let mut sum = 0;
        for i in 0..n {
            if i % 3 == 0 || i % 5 == 0 {
                sum += i;
            }
        }
        return sum
    }

    #[cfg(test)]
    mod tests {
        use super::*;
        use test_case::test_case;

        #[test_case(10, 23)]
        #[test_case(1000, 233168)]
        fn test_sum_multiples(n: i32, expected: i32) {
            let actual = sum_multiples(n);
            assert_eq!(expected, actual);
        }
    }
}