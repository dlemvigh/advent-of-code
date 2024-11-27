mod p3 {
    pub fn prime_factors(n: i64) -> Vec<i64> {
        if n == 1 {
            return vec![1];
        }

        let mut factors = vec![];
        let mut n = n;
        let mut i = 2;
        while i * i <= n {
            if n % i == 0 {
                factors.push(i);
                n /= i;
            } else {
                i += 1;
            }
        }
        if n > 1 {
            factors.push(n);
        }
        return factors;
    }

    #[cfg(test)]
    mod tests {
        use super::*;
        use test_case::test_case;

        
        #[test_case(1, vec![1])]
        #[test_case(2, vec![2])]
        #[test_case(3, vec![3])]
        #[test_case(4, vec![2, 2])]
        #[test_case(5, vec![5])]
        #[test_case(6, vec![2, 3])]
        #[test_case(12, vec![2, 2, 3])]
        #[test_case(13195, vec![5, 7, 13, 29])]
        #[test_case(600851475143, vec![71, 839, 1471, 6857])]
        fn test_prime_factors(n: i64, expected: Vec<i64>) {
            let actual = prime_factors(n);
            assert_eq!(expected, actual);
        }
    }
}