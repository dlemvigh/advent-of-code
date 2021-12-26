mod day7 {

	#[allow(dead_code)]
	pub fn binom(n: i32) -> i32 {
		return n * (n + 1) / 2;
	}

	#[allow(dead_code)]
	pub fn calc_fuel_cost(list: &Vec<i32>, pos: i32, cost_fn: fn(i32) -> i32) -> i32 {
		let fuel_cost = list.iter().fold(0, | acc, value | {
			let diff = (value - pos).abs();
			let cost = cost_fn(diff);
			return acc + cost;
		});
		return fuel_cost
	}

	#[allow(dead_code)]
	pub fn find_min_cost(list: &Vec<i32>, cost_fn: fn(i32) -> i32) -> Result<(i32, i32), String> {
		let min = list.iter().min();
		let max = list.iter().max();


		match (min, max) {
			(Some(min), Some(max)) => {
				let mut best_pos: i32 = -1;
				let mut best_cost: i32 = i32::MAX;
				for pos in *min..(*max + 1) {
					let cost = calc_fuel_cost(list, pos, cost_fn);
					if cost < best_cost {
						best_pos = pos;
						best_cost = cost;
					}
				}
				return Ok((best_pos, best_cost));
			},
			(_, _) =>  Err("Something when wrong with min/max".to_string())			
		}
	}

	#[cfg(test)]
	extern crate test_case;
	
	#[cfg(test)]
	mod tests {
		use super::*;
		use test_case::test_case;

		#[test_case(0, 0)]
		#[test_case(1, 1)]
		#[test_case(2, 3)]
		#[test_case(3, 6)]
		#[test_case(4, 10)]
		#[test_case(5, 15)]
		#[test_case(10, 55)]
		#[test_case(100, 5050)]
		fn binom_tests(n: i32, expected: i32) {
			let actual = binom(n);
			assert_eq!(expected, actual);
		}

		#[test]
		fn test_calc_fuel_cost() {
			let list = vec![1,2,3,4,5];
			let pos = 3;
			let actual = calc_fuel_cost(&list, pos, |x| x);
			assert_eq!(6, actual)
		}
	
		#[test_case(vec![1,2,3,4,5], 1, 10)]
		#[test_case(vec![1,2,3,4,5], 2, 7)]
		#[test_case(vec![1,2,3,4,5], 3, 6)]
		#[test_case(vec![1,2,3,4,5], 4, 7)]
		#[test_case(vec![1,2,3,4,5], 5, 10)]
		#[test_case(vec![1,1,1], 1, 0)]
		#[test_case(vec![1,1,1], 0, 3)]
		#[test_case(vec![1,1,1], 2, 3)]
		#[test_case(vec![16,1,2,0,4,2,7,1,2,14], 2, 37)]
		#[test_case(vec![16,1,2,0,4,2,7,1,2,14], 1, 41)]
		#[test_case(vec![16,1,2,0,4,2,7,1,2,14], 3, 39)]
		#[test_case(vec![16,1,2,0,4,2,7,1,2,14], 10, 71)]
		fn calc_fuel_cost_tests(list: Vec<i32>, pos: i32, expected: i32) {
			let actual = calc_fuel_cost(&list, pos, |x| x);
			assert_eq!(expected, actual);
		}

		#[test_case(vec![1,2,3,4,5], 1, 20)]
		#[test_case(vec![1,2,3,4,5], 2, 11)]
		#[test_case(vec![1,2,3,4,5], 3, 8)]
		#[test_case(vec![1,2,3,4,5], 4, 11)]
		#[test_case(vec![1,2,3,4,5], 5, 20)]
		#[test_case(vec![1,1,1], 1, 0)]
		#[test_case(vec![1,1,1], 0, 3)]
		#[test_case(vec![1,1,1], 2, 3)]
		fn calc_fuel_cost_binom(list: Vec<i32>, pos: i32, expected: i32) {
			let actual = calc_fuel_cost(&list, pos, binom);
			assert_eq!(expected, actual);
		}

		#[test_case(vec![1,1,1], (1, 0))]
		#[test_case(vec![1,2,3,4,5], (3, 6))]
		#[test_case(vec![16,1,2,0,4,2,7,1,2,14], (2, 37))]
		fn find_min_cost_test(list: Vec<i32>, expected: (i32, i32)) {
			let actual = find_min_cost(&list, |x| x);
			assert!(actual.is_ok());
			assert_eq!(expected, actual.unwrap());
		}

		#[test]
		fn part1() {
			let content = std::fs::read_to_string("src/day7.txt").expect("Unable to read file");
			let values: Vec<i32> = content.split(',').map(|x| x.parse().unwrap()).collect();
			let result = find_min_cost(&values, |x| x);
			assert!(result.is_ok());
			assert_eq!(result.unwrap(), (323, 336040));
		}

		#[test]
		fn part2() {
			let content = std::fs::read_to_string("src/day7.txt").expect("Unable to read file");
			let values: Vec<i32> = content.split(',').map(|x| x.parse().unwrap()).collect();
			let result = find_min_cost(&values, binom);
			assert!(result.is_ok());
			assert_eq!(result.unwrap(), (463, 94813675));
		}
	}
}

