#!/usr/bin/env ruby
require 'bigdecimal'

vertices = []
facets = []

ARGF.each do |line|
  c, *args = line.split
  case c
  when 'v'
    abort('broken vertex: ' ++ args.to_s) if args.size != 3
    vertices << args.map(&:to_f)
  when 'f'
    abort('broken facet: ' ++ args.to_s) if args.size != 3
    facets << args.map {|s| s.split('/')[0].to_i - 1}
  end
end

puts "OFF #{vertices.size} #{facets.size} 0"
vertices.each do |v|
  puts v.join(' ')
end
facets.each do |f|
  puts "3 #{f.join(' ')}"
end
