##
# Create individual pages for each icon in the FontAwesome set

require 'yaml'
require 'json'

module Jekyll

  class IconPage < Page

    ##
    # Take a single icon and render a page for it.

    def initialize(site, base, dir, old_icon_name, new_icon_name, new_icon_style)
      @site = site
      @base = base
      @dir = dir
      @name = "#{old_icon_name}.html"

      self.process(@name)

      self.read_yaml(File.join(base, site.config['layouts']), site.config['icon_layout'])

      self.data['redirect_to'] = "https://fontawesome.com/icons/#{new_icon_name}?style=#{new_icon_style}"
    end

  end

  class IconGenerator < Generator

    ##
    # Iterate over every described icon in a YAML file and create a page for it

    safe true

    def generate(site)
      styles = {
        'fas' => 'solid',
        'far' => 'regular',
        'fal' => 'light',
        'fab' => 'brands'
      }

      shims = JSON.load(File.open(File.join(site.source, 'shims.json')))

      lookup = shims.inject({}) do |acc, shim|
        old_name = shim[0]
        new_prefix = shim[1] || 'fas'
        new_name = shim[2] || old_name

        acc[shim[0]] = { new_name: new_name, style: styles[new_prefix] }

        acc
      end

      site.icons.each do |icon|
        if lookup.has_key? icon.id
          new_icon_name = lookup[icon.id][:new_name]
          new_icon_style = lookup[icon.id][:style]
        else
          new_icon_name = icon.id
          new_icon_style = "solid"
        end

        site.pages << IconPage.new(site, site.source, site.config['icon_destination'], icon.id, new_icon_name, new_icon_style)
      end
    end

  end

end
