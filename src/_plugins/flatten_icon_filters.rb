##
# Flattens the icons object to a one-dimensional array of possible search terms.

require 'set'

module Jekyll
  module FlattenArray
    def flattenIconFilters(icons)
      flattened = Set.new
      icons.each do |icon|
        toAdd = []

        toAdd.push(icon["class"].downcase) # Add class as a filter value

        # Add any existing aliases as a filter value
        if not icon["aliases"].nil?
          icon["aliases"].each do |iconAlias|
            toAdd.push(iconAlias.downcase)
          end
        end

        # Add any existing filters as a filter value
        if not icon["filter"].nil?
          icon["filter"].each do |iconFilter|
            toAdd.push(iconFilter.downcase)
          end
        end
        flattened.merge(toAdd)

        print toAdd if toAdd.include? true
        print toAdd if toAdd.include? false
      end
      return flattened.to_a # .to_a because we can't jsonify a <Set>
    end
  end
end

Liquid::Template.register_filter(Jekyll::FlattenArray)
