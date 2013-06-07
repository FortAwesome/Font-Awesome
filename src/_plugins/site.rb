##
# Provide an icons attribute on the site object

require 'yaml'
require 'forwardable'

module Jekyll

  class Icon

    attr_reader :name, :id, :unicode, :created, :categories

    def initialize(icon_object)
      @icon_object = icon_object

      # Class name used in CSS and HTML
      @icon_object['class'] = icon_object['id']
      # Normalize the aliases
      @icon_object['aliases'] ||= []

      @name = icon_object['name']
      @id = icon_object['id']
      @class = icon_object['class']
      @aliases = icon_object['aliases']
      @unicode = icon_object['unicode']
      @created = icon_object['created']
      @categories = icon_object['categories']
    end

    def to_liquid
      return @icon_object
    end

  end

  class IconList
    ##
    # A list of icons
    #
    include Enumerable
    extend Forwardable

    def_delegators :@icon_array, :each, :<<

    def initialize(icon_array)
      @original_icon_array = icon_array
      @icon_array = []

      icon_array.each { |icon_object|
        @icon_array << Icon.new(icon_object)
      }
    end

    def [](k)
      @icon_array[k]
    end

    def to_liquid
      @original_icon_array
    end

  end

  module IconFilters
    def expand_aliases(icons)
      expanded = []

      icons.each { |icon|
        # Remove the aliases since we are expanding them
        expanded << icon.reject{ |k| k == 'aliases'}

        icon['aliases'].each { |alias_id|
          alias_icon = expanded[-1].dup
          alias_icon['class'] = alias_id
          alias_icon['alias_of'] = icon

          expanded << alias_icon
        }
      }

      return expanded
    end

    def category(icons, cat)
      icons.select { |icon| icon['categories'].include?(cat) }
    end

    def version(icons, version)
      icons.select { |icon| icon['created'] == version }
    end

    def sort_by(icons, sort_key)
      icons.sort_by! { |icon| icon[sort_key] }
    end
  end

  Liquid::Template.register_filter(IconFilters)

  class Site

    attr_reader :icons

    def process
      self.reset_icons
      self.reset
      self.read
      self.generate
      self.render
      self.cleanup
      self.write

      self.build
    end

    ##
    # Reads the YAML file that stores all data about icons
    def reset_icons
      @icons = IconList.new(YAML.load_file(self.config['icon_meta'])['icons'])
    end

    ##
    # After generation, runs a build of Font-Awesome
    def build
      system("make build", :chdir => self.config['destination'], :out => :err)
    end

    def site_payload
      {
        "site"       => self.config.merge({
          "time"       => self.time,
          "posts"      => self.posts.sort { |a, b| b <=> a },
          "pages"      => self.pages,
          "html_pages" => self.pages.reject { |page| !page.html? },
          "categories" => post_attr_hash('categories'),
          "tags"       => post_attr_hash('tags')}),
        "icons"      => @icons,
      }
    end

  end

end
