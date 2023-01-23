## Exercise 11.1 (268 words)

I choose Rust as the language for this exercise as I have some personal experience with it already.
The main tool used with Rust is `cargo` which is similar to `npm` with JavaScript. Rust code is
usually built with the command `cargo build` but programs with just a single source file can be
compiled with just `rustc`. Testing can also be done with cargo by running `cargo test` which will
run functions flagged with `#[test]` which are usually included at the end of the source files in a
module flagged with `#[cfg(test)]` (to only compile them for test builds). The default Rust compiler
`rustc` has some linting rules which are displayed during compilation but the usual tool for even
more linting rules seems to be called `clippy`.

For CI solutions the first one listed in official Rust documentation is Travis CI which seems to
have a nice simple and compact config file when compared to GitHub actions and even has an
`allow_failures` option which can be used with nightly builds of Rust for example. Most CI solutions
seem to be cloud based which is understandable as setting everything up properly locally would
require multiple different machines to properly test different operating systems and processor
architectures. And most of the time it is definitely better to use cloud-based options for CI but
with really resource hungry or hardware specific programs that's not always an option as cloud-based
solutions run on whatever hardware the provider has chosen as the best for them. And usually
cloud-based CI solutions don't seem to include any kind of GPU for more advanced graphics rendering.
