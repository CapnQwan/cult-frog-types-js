# Changelog

All notable changes to `@cult-frog/types` are documented here. This project
follows [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-10-07

### Added

- **Typed array types** (`typedArrays`), for writing storage code that works
  across every number typed array while keeping the caller's exact array type.
  - `TypedArrayView<Self, B>`: the parts of a number typed array (`Float32Array`,
    `Int32Array`, `Uint8ClampedArray`, …) that generic storage code needs.
    `subarray`, `copyWithin` and `fill` return `Self`, so constraining
    `T extends TypedArrayView<T>` hands back the concrete type rather than a
    widened view. The bigint arrays (`BigInt64Array`, `BigUint64Array`) are
    rejected, and `B` narrows the backing buffer to `ArrayBuffer` or
    `SharedArrayBuffer` when the distinction matters.
  - `TypedArrayConstructor<T, B>`: a constructor that builds a `T` over an
    existing buffer `B`. Built-in constructors like `Float32Array` can be passed
    directly, and a constructor for the wrong element type (for example
    `Int32Array` where a `Float32Array` is expected) is rejected. `B` defaults
    to `T['buffer']`, so generic code needs only one type parameter.

  When a generic function infers `T` from a built-in constructor, `T` is always
  inferred over an `ArrayBuffer`. Passing a `SharedArrayBuffer` without naming
  the array type is a compile error. Write
  `view<Uint16Array<SharedArrayBuffer>>(Uint16Array, sab)` instead.

### Changed

- Type tests now live in a `__tests__` folder next to the code they cover, with
  one test file per type. No public types changed.

## [0.1.0] - 2026-09-15

Initial release: array, brand, lifecycle, mutability, record, serialization,
type-testing and tagged-union utility types.

[0.2.0]: https://github.com/CapnQwan/cult-frog-types-js/compare/6edbdaf...560c380
[0.1.0]: https://github.com/CapnQwan/cult-frog-types-js/commit/6edbdaf
