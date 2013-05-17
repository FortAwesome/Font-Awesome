##
# Create Less and Sass files

require 'yaml'
require 'forwardable'
require 'debugger'

module Jekyll

  class CssPreProcPage < Page

    def initialize(site, base, dir, name, icons)
      @site = site
      @base = base
      @dir = dir
      @name = name
      @icons = icons

      self.process(@name)

      self.read_yaml(File.join(base, site.config['layouts']), @name)

      self.data['icons'] = icons
    end

  end

  class CssPreProcGenerator < Generator

    ##
    # Iterate over every described icon in a YAML file and create a page for it

    safe true

    def generate(site)
      # Need to figure use lessc to generate the files first
      return

      less_destination = site.config['css_preproc']['less_destination']

      # Less file
      site.pages << CssPreProcPage.new(
        site, site.source, less_destination,
        site.config['css_preproc']['less_layout'],
        site.icons)

      # Less IE7 file
      site.pages << CssPreProcPage.new(
        site, site.source, less_destination,
        site.config['css_preproc']['less_ie7_layout'],
        site.icons)
    end

  end

end
