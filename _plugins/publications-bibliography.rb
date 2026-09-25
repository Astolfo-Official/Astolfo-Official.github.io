require 'jekyll-scholar'

module Jekyll
  class Scholar
    class PublicationsBibliographyTag < BibliographyTag
      def render(context)
        set_context_to context
        update_dependency_tree

        preprints, publications = cited_entries.partition { |entry| arxiv_preprint?(entry) }
        sections = []

        unless preprints.empty?
          sections << content_tag('h2', 'preprint', :class => config['bibliography_class'])
          sections << render_items(preprints)
        end

        unless publications.empty?
          sections << (group? ? render_groups(group(publications)) : render_items(publications))
        end

        sections.join("\n")
      end

      private

      def arxiv_preprint?(entry)
        # A formal venue takes precedence over retained arXiv links/metadata.
        venues = [:journal, :booktitle].map { |field| entry[field].to_s.strip }
        return false if venues.any? { |venue| !venue.empty? && !venue.match?(/\barxiv\b/i) }

        return true unless entry[:arxiv].to_s.strip.empty?

        [:archiveprefix, :publisher, :journal, :number, :doi, :url].any? do |field|
          entry[field].to_s.match?(/\barxiv\b/i)
        end
      end
    end
  end
end

Liquid::Template.register_tag('publications_bibliography', Jekyll::Scholar::PublicationsBibliographyTag)
